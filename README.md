# databird
JSON and CSV data visualizer


## Example feature code

```
const Http = new XMLHttpRequest();
const url='https://reqres.in/api/users?page=2';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    displayJSON(JSON.parse(Http.responseText));
}


displayJSON([
    { mydata : '1', another: 'some text', nest: { 
        mykey: 'my value' 
    }},
    { mydata : '2', another: 'more text', nest: { 
        mykey: 'my value', table: [{first: 1, second: 2}, {first: 1.1, second: 2.1}] 
    }},
    { mydata : '3', another: '4 text', nest: { 
        table: [{first: 1, second: 2}, {first: 1.1, second: 2.1}]
    }},
    { mydata : '4', another: '3 text' },
    { mydata : '5', another: '12 text' }
]);
```

```
displayJSON({ data: 
    { mydata : '1', another: 'some text', nest: { 
        mykey: 'my value', 'another nest': { test: '123', testing: '456'}
    }}
});
```

```
    displayCSV("first, second, third\n1, 2, 3\none, two, three");
```