-----GIT--------
1.添加远程库
①关联一个远程库：git remote add origin git@server-name:path/repo-name.git
②关联后第一次推送master分支的所有内容：git push -u origin master
③此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改
ps:由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

查看远程仓库 git remote -v
删除远程仓库 git remote remove origin   --  这个origin是我们给远程仓库起的名字
添加远程仓库 git remote add origin git@git.afmobi.com:QSee/GoldDigger_chrome.git    --  这个origin是我们给远程仓库起的别名

