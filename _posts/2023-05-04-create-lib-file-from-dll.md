---
description: >-
    Learn how to generate a *.lib file from a *.dll with this comprehensive guide. Using the Visual Studio Command Prompt and Microsoft's recommended tools, this article walks you through the steps for a seamless process. Perfect for developers working with 3rd party win dll's.
title: Create ".lib" file from ".dll" (archive)
layout: post
---

> This's a copy of a non-my post.
> The original article [is here](https://adrianhenke.wordpress.com/2008/12/05/create-lib-file-from-dll/) ([archive](https://web.archive.org/web/20161118122539/https://adrianhenke.wordpress.com/2008/12/05/create-lib-file-from-dll/)).

When working with 3rd party win dll's you sometimes miss the according to the `*.lib` file required to compile against it.
There is an [Microsoft KB-Q131313](http://support.microsoft.com/?scid=kb%3Ben-us%3B131313&x=1&y=15) ([archive](https://jeffpar.github.io/kbarchive/kb/131/Q131313/)) article showing how to generate a `*.lib` file from a `*.dll` however the required steps are not described detailed enough I think.
So here is my quick guide.

Open the "Visual Studio Command Prompt", you find its shortcut in "_Start_" -> "_Programs_" -> "_Microsoft Visual Studio Tools_".
Now run the `dumpbin` command to get a list of all exported functions of your dll:

```bash
dumpbin /exports C:\\yourpath\\yourlib.dll
```

This will print quite a bit of text to the console.
However, we are only interested in the functions:

```
ordinal hint RVA      name

1    0 00017770 jcopy_block_row
2    1 00017710 jcopy_sample_rows
3    2 000176C0 jdiv_round_up
4    3 000156D0 jinit_1pass_quantizer
5    4 00016D90 jinit_2pass_quantizer
6    5 00005750 jinit_c_coef_controller
...etc
```

Now copy all those function names (only the names!) and paste them into a new text file.
Name the next file `yourlib.def` and put the line "EXPORTS" at its top.
My `yourlib.def` file looks like this:

```
EXPORTS
jcopy_block_row
jcopy_sample_rows
jdiv_round_up
jinit_1pass_quantizer
jinit_2pass_quantizer
jinit_c_coef_controller
...
```

Now from that definition file, we can finally create the `*.lib` file.
We use the `lib` tool for this, so run this command in your "Visual Studio Command Prompt":

```bash
lib /def:C:\\mypath\\mylib.def /OUT:C:\\mypath\\mylib.lib
```

That's it, happy coding 🙂