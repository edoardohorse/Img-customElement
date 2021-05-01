# [Demo](https://edoardohorse.github.io/Img-customElement/)


<!-- # Variants -->
    
# Syntax

```html
    <img-lazy
        src='string'
        lazy=[true]|false
        placeholder=[true]|false

        width=[100%]
        height=[100%]

        alt='url|text'
        >

    </img-lazy>
    
```

## Properties

| Property   | Attribute  | Description | Type      | Default         |
| ---------- | ---------- | ---------  | --------- | --------------- |
| `lazy`  | `lazy`| If the image is visible into the screen by the use, it's not loaded | `bool`  | `true`     |
| `placeholder`  | `placeholder`| When the image is visible into the screen by the user, placeholder it's showned and starting loading | `bool`  | `true`     |
| `width`  | `width`| Set width of img (see [Important](#%EF%B8%8F-important))| `int`  | `100% of image`     |
| `height`  | `height`| Set height of img (see [Important](#%EF%B8%8F-important)) | `int`  | `100% of image`     |
| `alt`  | `alt`| Set an alternative image or text to show when loading fails | `text` or `url`  | `Image not found 😢`     |

<!-- ## CSS Variables

|Name|Default value
|-|:-:|
 -->

---


### ⚠️ Important
- When 
- When `width` and `height` are not setted, img-lazy has the same size of parent
- When `width` is setted and `height` not, img-lazy has height as width while loading (square); once loaded `height` is **auto** to img (aspect ratio respected)
- When `height` is setted and `width` not, img-lazy has width as height while loading (square); once loaded `width` is **auto** to img (aspect ratio respected)
- When `width` and `height` are setted, img is setted as those attributes (aspect ratio respected)

---
