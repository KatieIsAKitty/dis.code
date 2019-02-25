![img](https://raw.githubusercontent.com/Consoli0/dis.code/master/banner.png)
# Currently, this package is in beta, it does not have many features.

If you are looking to test my package, I have the following example:
```js
const dsc=require('dis.code');
const token='youputyourtokenhere';
const client=new dsc.client(token,{
    prefix: '>',
    ownerID: '186480997586436106'
});
client.ready(()=>console.log('Bot loaded'));
client.command((data)=>{
    console.log(data);
});
client.run();
```
If you run this snippet, and send `>say arguments are cool "Hello parser!" -y --flag --anotherflag:value "--somanyflags:are cool"`, it will print this to console:
```
{ cmd: 'say',
  args: [ 'arguments', 'are', 'cool', 'Hello parser!' ],
  flags:
   { y: true,
     flag: true,
     anotherflag: 'value',
     somanyflags: 'are cool' },
  raw: '>say arguments are cool "Hello parser!" -y --flag --anotherflag:value "--somanyflags:are cool"' }
```

[Docs](https://discode.really-f.ml/)
[Repo](https://github.com/Consoli0/dis.code)
[NPM Page](https://npmjs.com/package/dis.code)