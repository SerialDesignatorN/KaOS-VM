# KaOS-VM
OS emulation on the web. Hassle-free guarranteed

# How to use
Select an OS desired on the start screen. Click Start Machine on one of them. It can be up to you. Enjoy.
To use an OS outside of the selection, read more about it in the [API documentation here.](#api-documentation)

To enable or appear the menubar, hover on the top or press Esc button.

![Imgur](https://i.imgur.com/cezjlLV.gif)
### Here is what you must do when about to lock your VM
When prompted for first time, you must input it blank, otherwise it will say as `Wrong Password`. After that, you may relock then set your password.

**Note: The password will be stored and will be cleared when refreshed**
# API Documentation
***Sorry ya, I only provide 1 API parameters***

## `os` parameter (Mandatory)
The `os` parameter specifies the URL of the browser-based OS. For example, we will use `https://win11.blueedge.me/` and to combine together, 
find and go to the client HTML (`client/index.html`) then pass over the info

***Note this is just demo***
```/home/user/KaOS-VM/client/index.html?os=https://win11.blueedge.me/```

## More API contribution
Wanna have more of the API? Open a pull request. Then, I will debug and if it succedded, I may put it here.
Thanks for your contribution.

## Contributors and Helpers
- zeankun.dev (Me)
- Copilot
