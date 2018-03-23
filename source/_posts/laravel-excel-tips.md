---
title: laravel-excel-tips
date: 2018-03-23 17:24:31
tags:
---

### laravel-excel 备忘

### 本文使用前提条件
1. `"maatwebsite/excel": "~2.1.0"`
2. [laravel-excel手册，这个很重要](https://laravel-excel.maatwebsite.nl/docs/2.1/getting-started/basics)

### laravel-excel的简单操作
```php
// 主要代码
 Excel::create($this->getTable(), function ($excel) {
    $excel->sheet('Sheetname11', function ($sheet) {
        // do something
    }
 }

```

#### 单元格操作
1. 宽度
```php
$sheet->setWidth('A', 5);
// Set width for multiple cells
$sheet->setWidth(array(
    'A'     =>  5,
    'B'     =>  10
));
```
2. 高度
```php
$sheet->setHeight(1, 50);

// Set height for multiple rows
$sheet->setHeight(array(
    1     =>  50,
    2     =>  25
));
```
3. 宽高
```php
$sheet->setSize('A1', 500, 50);

$sheet->setSize(array(
    'A1' => array(
        'width'     => 50,
        'height'    => 500
    )
));
```
4. 设置图片
```php
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('本地图片路径');
# 设置图片高度
$objDrawing->setHeight('xxx');
# 设置照片宽度
$objDrawing->setWidth('xxx');
# 设置图片要插入的单元格
$objDrawing->setCoordinates('xxx');
$objDrawing->setWorksheet($sheet);
```

### 练手
1. 新建用户表
```php
Schema::create('users', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('email')->unique();
    $table->string('password');
    $table->string('image', 255);
    $table->rememberToken();
    $table->timestamps();
});

``` 
2. 生成用户数据
```php
// 定义user的工厂
$factory->define(App\User::class, function (Faker $faker) {
    $path = 'app' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR  . 'image';
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
        'image' => $path . $faker->image(storage_path($path), 640, 480, null, false)
    ];
});
```
> 注意<br/>
  2.1. 运行 php artisan tinker后报：`PHP Warning:  unlink ... Resource temporarily unavailable `<br/>
  2.2. [原因](https://segmentfault.com/q/1010000002396283)<br/>
  2.3. [解决方案](https://github.com/fzaninotto/Faker/issues/1402)<br/>

4. 测试
``` php
public function testExcelExport()
{

    $basePath = storage_path('excel'. DIRECTORY_SEPARATOR .'exports');
    $fileName = 'exportFile';
    $ext = 'xls';

    \Excel::create($fileName, function ($excel) {
        $excel->sheet('Sheetname11', function ($sheet) {
            $rows = User::all()->toArray();
            array_unshift($rows, ['name' => 'Name', 'email' => 'Email', 'image' => 'Image']);
            // 设置宽度
            $sheet->setWidth('A', 30);
            $sheet->setWidth('B', 30);
            $sheet->setWidth('C', 30);
            // 设置边框
            $sheet->setBorder('A1', 'thin');
            $sheet->setBorder('B1', 'thin');
            $sheet->setBorder('C1', 'thin');

            $num = count($rows);
            for ($i = 0; $i < $num; $i++) {

                $sheet->cell('A' . ($i + 1), function ($cell) use ($rows, $i) {
                    $cell->setValue($rows[$i]['name']);
                    $cell->setAlignment('center');
                    $cell->setValignment('center');
                });
                $sheet->cell('B' . ($i + 1), function ($cell) use ($rows, $i) {
                    $cell->setValue($rows[$i]['email']);
                    $cell->setAlignment('center');
                    $cell->setValignment('center');
                });

                if (($i + 1) == 1) { // 过滤第一组数据，因为第一组没有图片路径
                    $sheet->setCellValue('C1', $rows[$i]['image']);
                    continue;
                }
                // 设置行高
                $sheet->setHeight(($i + 1), 105);
                // 设置图片存储
                $objDrawing = new PHPExcel_Worksheet_Drawing();
                $objDrawing->setPath(storage_path('/' . $rows[$i]['image']));
                # 设置图片高度
                $objDrawing->setHeight(190);
                # 设置照片宽度
                $objDrawing->setWidth(190);
                # 设置图片要插入的单元格
                $objDrawing->setCoordinates('C' . ($i + 1));
                $objDrawing->setWorksheet($sheet);
            }
        });

    })->store($ext, $basePath);

    $filePath = $basePath . DIRECTORY_SEPARATOR . $fileName . '.' . $ext;
    $this->assertTrue(file_exists($filePath));
}
```


