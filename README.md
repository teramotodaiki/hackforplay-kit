# hackforplay-kit
Developing restaging kit of hackforplay.

# Make new project

## 1. Add directory in `/kit` 

Copy from `/kit/project_name` directory (and `index.php`)

Then name the directory __your project name__.

## 2. Modify some settings of `/common.php`

> ~~$stage['Src'] = 'kit/project_name/index.php';~~

> $stage['Src'] = 'kit/__your project name__/index.php';


## 3. Add javascript files in `libs/`

If you will add __new script__.js

* hackforplay-kit/
  * libs/
    * hack.js
    * run.js
    * ...
    * __new script__.js

## 4. Modify `<script>` tag in `kit/your project name/index.php`

Load all scripts you needs.

```html
<!-- before -->
<script src="/s/lib/run.js" type="text/javascript" charset="utf-8"></script>

<!-- after -->
<script src="/s/lib/__new script__.js" type="text/javascript" charset="utf-8"></script>
```
