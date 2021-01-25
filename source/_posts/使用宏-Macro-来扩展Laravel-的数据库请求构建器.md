---
title: 使用宏(Macro) 来扩展Laravel 的数据库请求构建器
date: 2021-01-05 15:09:13
tags:
---

### 定义宏
``` php
Builder::macro('searcher', function (Searcher $searcher, $field = null) {
    /** @var Builder $this */
    return with(new MacroSearcher($this, $searcher, $field))->execute();
});
```

### 使用 Macro
```php
User::query()
    ->select('id', 'name')
    ->searcher(new EqualSearcher(1), 'id')
    ->toSql();

// select `id`, `name` from `user` where `id` = ?
```

### 完整代码
```php
# 1 Column 
class Column
{
    protected $name;

    public function __constrct($name)
    {
        $this->name = $name;        
    }
}

# 2 Search
abstract class Searcher
{

    /**
     * @var Request
     */
    protected $request;

    // 查询字段名
    protected $searchKey = null;


    /**
     * @var Column
     */
    protected $column;

    public function bind(Column $column)
    {
        $this->column = $column;
        $this->request = \request();
        return $this;
    }

    public abstract search(Builder $builder);
}

# 3 MacroSearcher
class MacroSearcher
{

    /**
     * @var Builder
     */
    private $builder;
    /**
     * @var Searcher
     */
    private $searcher;
    
    private $field;

    public function __construct(Builder $builder, Searcher $searcher, $field)
    {

        $this->builder = $builder;
        $this->searcher = $searcher;
        $this->field = $field;

    }

    protected function wrapSearchers(Searcher $searcher)
    {
        $column = $searcher->column();
        $args = explode('.', $column->getAlias());
        if (count($args) > 1) {
            $relation = camel_case($args[0]);

            $this->builder = $this->builder->whereHas($relation, function ($query) use ($searcher) {
                $searcher->search($query);
            });

        } else {
            $this->builder = $searcher->search($this->builder);
        }
    }


    public function execute()
    {

        $this->wrapSearchers($this->searcher->bind(new Column($this->field)));

        return $this->builder;
    }

}
```

### ide-help
```php

# 在 _ide_helper 文件 底部，追加

namespace Illuminate\Database\Query {

    use Searcher;

    /**
     * Class Builder
     * @package Illuminate\Database\Query
     */
    class Builder
    {

        /**
         *
         *
         * @param Searcher $searcher
         * @param string|null $field
         * @return $this
         */
        public function searcher(Searcher $searcher, string $field = null) {
            return $this;
        }

    }
}

```


> 参考
- [使用宏（Macro）来扩展 Laravel 的数据库请求构建器](https://learnku.com/laravel/t/15247/expand-the-laravel-database-request-builder-using-macro-macro)

- [Autocomplete in IDE's for custom macros?](https://github.com/spatie/laravel-collection-macros/issues/16)