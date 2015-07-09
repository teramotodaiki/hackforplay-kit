# hackforplay-kit
Developing restaging kit of hackforplay.

# Make new project

## 1. Add directory in `/kit` 

Copy from `/kit/project_name` directory (and `index.php`)
Then the directory names *project_name* as your project name.

## 2. Modify some settings of `/common.php`

```php
$stage['Title'] = 'Title'; // Title of your game.
$stage['Explain'] = 'This is a description of the stage.'; // Description of your game.
$stage['Playcount'] = '9999'; // Mostly neglect
$stage['Src'] = 'kit/project_name/index.php'; // Change project_name into your project name.
```

## 3. Add javascript files in `libs/`

## 4. Modify `<script>` tag in `kit/__your_project__/index.php

Load scripts you needs.
