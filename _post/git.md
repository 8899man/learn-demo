根据《pro git》这本教程重写git教程。


关于git博客的重写：
1. git pull --rebase origin resource
2. git push -u origin master:resource

git中执行命令 `add .`
报错：Unlink of file 'templates/opma.exe' failed.Should I try again?(y/n)
因为这个文件正在被占用，所以不能添加到暂存区，而正好这个 `.exe` 文件，我们是不需要添加到版本管理工具的。所以我们选择 `n` 。

git中生成sshkey:
`ssh-keygen -t rsa -C "youremail"`
这个`email`并没有什么用
所以我们使用`ssh-keygen -t rsa`来生成sshkey就可以了。
然后git中的配置文件：
`git config --list`
`git config --global user.name "yu"`
`git config --global user.email "react.dong.yu@gmail.com"`
这种配置将会对本地所有的git仓库有效。
那么在push的时候，远程就知道这个push来自于哪个email.
但有时候在公司的时候，有的仓库是公司的，有的仓库是自己github的。
这个时候就可以不设置global的配置了，而是在自己的仓库中设置
`git config --local user.email "react.dong.yu@gmail.com"`

-----GIT--------
1.添加远程库
①关联一个远程库：git remote add origin git@server-name:path/repo-name.git
②关联后第一次推送master分支的所有内容：git push -u origin master
③此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改
ps:由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

查看远程仓库 git remote -v
删除远程仓库 git remote remove origin   --  这个origin是我们给远程仓库起的名字
添加远程仓库 git remote add origin git@git.afmobi.com:QSee/GoldDigger_chrome.git    --  这个origin是我们给远程仓库起的别名


git stash: 备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到 Git 栈中。
git stash pop: 从 Git 栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个 stash 的内容，所以用栈来管理，pop 会从最近的一个 stash 中读取内容并恢复。
git stash list: 显示 Git 栈中内的所有备份，可以利用这个列表来决定从哪个地方恢复。
git stash clear: 清空 Git 栈。


** 使用 git 的时候，我们往往使用 branch 解决任务切换问题，例如，我们往往会建一个自己的分支去修改和调试代码，如果别人或者自己发现原有的分支上有个不得不修改的 bug，我们往往会把完成一半的代码 commit 提交到本地仓库，然后切换分支去修改 bug，改好之后再切换回来。这样的话往往 log 上会有大量不必要的记录。其实如果我们不想提交完成一半或者不完善的代码，但是却不得不去修改一个紧急 bug，那么使用 git stash 就可以将你当前未提交到本地的代码推入到 git 的栈中，这时候你的工作区间和上一次提交的内容是完全一样的，所以你可以放心的修 bug，等到修完 bug，提交到服务器上后，再使用 git stash apply 将以前一般的工作应用回来。也许有的人会说，那我可不可以多次将未提交的代码压入到栈中？答案是可以的。当你多次使用 git stash 命令后，你的栈里将充满了未提交的代码，这时候你会对将哪个版本应用回来有些困惑， git stash list 命令可以将当前的 Git 栈信息打印出来，你只需要将找到对应的版本号，例如使用 `git stash apply stash@{1}` 就可以将你指定版本号为 stash@{1} 的工作取出来，当你将所有的栈都应用回来的时候，可以使用 git stash clear 来将栈清空。
在这里顺便提下 git format-patch -n , n是具体某个数字， 例如 'git format-patch -1' 这时便会根据log生成一个对应的补丁，如果 'git format-patch -2' 那么便会生成2个补丁，当然前提是你的log上有至少有两个记录。 **

看过上面的信息，就可以知道使用场合了：当前工作区内容已被修改，但是并未完成。这时 Boss 来了，说前面的分支上面有一个 bug，需要立即修复。可是我又不想提交目前的修改，因为修改没有完成。但是，不提交的话，又没有办法 checkout 到前面的分支。此时用 git stash 就相当于备份了工作区了。然后在 checkout 过去修改，就能够达到保存当前工作区，并及时恢复的作用。

dev   ->  dev_yudong 
在 `dev_yudong` 上编码的时候，需要修改 dev 上面的 bug，但是 `dev_yudong` 上面的东西还不想提交，所以：`git stash`。
然后 checkout 到 dev 上面去改完，提交。然后切换回来，在 `dev_yudong` 上面 `git stash pop`，就可以回到暂存时候的状态。

注意这里由于只 stash 了一次所以要使用pop，具体你存放了多少。










