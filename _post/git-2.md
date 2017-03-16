---
### 忽略某些文件
```
cat .gitignore
*.[oa]
*~
```

文件 `.gitignore` 的格式规范如下：
- 所有空行或者以注释符号 `#` 开头的目录都会被 Git 忽略
- 可以使用标准的 glob 模式匹配
- 匹配模式最后跟反斜杠（`/`）说明要忽略的目录
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（`!`）取反

---
前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：
第一步是用 `git add` 把文件添加进去，实际上就是把文件修改添加到暂存区；
第二步是用 `git commit` 提交更改，实际上就是把暂存区的所有内容提交到当前分支。

----
使用Windows的同学注意了，如果你在资源管理器里新建一个.gitignore文件，它会提示你必须输入文件名，但是在文本编辑器里“保存”或者“另存为”就可以把文件保存为.gitignore了。
有些时候，你想添加一个文件到Git，但发现添加不了，原因是这个文件被.gitignore忽略了：
`git add App.class`
如果你确实想添加该文件，可以用`-f`强制添加到Git：
`git add -f App.class`
或者你发现，可能是.gitignore写得有问题，需要找出来到底哪个规则写错了，可以用`git check-ignore`命令检查：
`git check-ignore -v App.class`


---
### Git log
`git log` 命令可以查看历史记录，`git log` 命令显示从最近到最远的提交日志，如果嫌输出信息太多，看得眼花缭乱的，可以试试 `git log --pretty=oneline` 。我们可以看到当前版本以及之前的版本日志以及版本号，好了，现在我们启动时光穿梭机，回到前面的版本。
首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，上一个版本就是`HEAD^` ，上上一个版本就是 `HEAD^^` ， 当然往上100个版本写100个 `^` 比较容易数不过来，所以写成 `HEAD~100` 。
现在，我们要把当前版本回退到上一个版本，就可以使用 `git reset` 命令：
`git reset --hard HEAD^`
当你回退到了某个版本后，`git log` 只能显示此版本及之前的版本的日志，之后的版本日志就看不到了，但是，我们想恢复到之后教新的版本怎么办？
Git提供了一个命令 `git reflog` 用来记录你的每一次命令

---

`git diff HEAD -- demo.html`命令可以查看工作区和版本库里面最新版本的区别。

---
### git chechout
`git checkout -- demo.html` 意思就是，把 `demo.html` 文件在工作区的修改全部撤销，这里有两种情况：
一种是 `demo.html` 自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
一种是 `demo.html` 已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加暂存区后的状态。
总之，就是让这个文件回到最后一次 `git commit` 或 `git add` 时的状态。

但是如果 `git add` 到暂存区了，在commit之前，想撤销：
Git同样告诉我们，用命令 `git reset HEAD file` 可以把暂存区的修改撤销掉(unstage)，重新放回工作区。
`git reset` 命令既可以回退版本，也可以把暂存区的修改回退到工作区，当我们用 `HEAD` 时，表示最新的版本。
再用 `git status` 查看一下，现在暂存区是干净的，工作区有修改：
还记得如果丢弃工作区的修改吗？
`git checkout -- demo.html` 



#### 小结
场景1：当你该乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令 `git checkout -- file`。
场景2：当你不但该乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令 `git reset HEAD file` ，就回到了场景1，第二步按场景1操作。
场景3：已经提交了不合适的修改到版本库是，想要撤销本次操作，参考版本回退一节，不过前提是没有推送到远程仓库。

#### 删除文件
本地删除 ： `rm demo.html`
git删除 ： `git rm demo.html`
git 做版本 ： `git commit -m 'delete demo.htl'`

本地删除 ： `rm demo.html`
不想删除 ： `git checkout -- demo.html`
`git checkout` 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以"一键还原"。

命令 `git rm` 用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。

---
#### 远程仓库
ssh-keygen -t rsa -C 'youremail@example.com'

git remote add origin git@github.com:Neveryu/learn-demo.git
添加后，远程库的名字就是 `origin` ，这是git默认的叫法，也可以改成别的，但是 `origin` 这个名字一看就知道是远程库。

git push -u origin master
由于远程库是空的，我们第一次推送 `master` 分支时，加上了 `-u` 参数，Git不但会把本地的 `master` 分支内容推送的远程新的 `master` 分支，还会把本地的 `master` 分支和远程的 `master` 分支关联起来，在以后的推送或者拉取时就可以简化命令。

从现在起，只要本地作了提交，就可以通过命令：
```
git push origin master
```

##### 从远程仓库拉取项目
现在，远程库已经准备好了，下一步是用命令git clone克隆一个本地库
```
git clone git@github.com:Neveryu/learn-demo.git
```

你也许还注意到，Github给出的地址不止一个，还可以用 `https://github.com/Neveryu/learn-demo.git` 这样的地址。实际上，Git支持多种协议，默认的 `git://` 使用ssh，但也可以使用 `https` 等其他协议。

使用 `https` 除了速度慢意外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。

Git支持多种协议，包括 `https` ，但通过 `ssh` 支持的原生 `git` 协议速度最快。

---
创建与合并分支

有人把Git的分支模型称为“必杀技特性”，Git的分支可谓是难以置信的轻量级，它的新建操作几乎可以在瞬间完成，并且在不同分支间切换起来也差不多一样快。

`git checkout -b dev`
`git checkout` 命令加上`-b`参数表示创建并切换，相当于以下两条命令：
`git branch dev`
`git checkout dev`
然后用`git branch` 命令查看当前分支：
`git branch`
`git branch`命令会列出所有分支，当前分支前面会标一个`*`号。

现在，`dev`分支的工作完成，我们就可以切换回`master`分支
`git checkout master`
现在，我们把`dev`分支的工作成果合并到`master`分支上：
`git merge dev`
`git merge` 命令用于合并指定分支到当前分支。
注意到上面的 `Fast-forward` 信息，Git告诉我们，这次合并是“快进模式”，也就是直接把 `master` 指向 `dev` 的当前提交，所以合并速度非常快。


记住，提交时记录的是放在暂存区域的快照，任何还未暂存的仍然保持已修改状态，可以在下次提交时纳入版本管理。每一次运行提交操作，都是对你项目作一次快照，以后可以回到这个状态，或者进行比较。


请注意，合并时出现了“Fast forward”的提示。由于当前 master 分支所在的提交对象是要并入的 hotfix 分支的直接上游，Git 只需把 master 分支指针直接右移。换句话说，如果顺着一个分支走下去可以到达另一个分支的话，那么 Git 在合并两者时，只会简单地把指针右移，因为这种单线的历史分支不存在任何需要解决的分歧，所以这种合并过程可以称为快进（Fast forward）。

`rebase` （衍合）命令，可以把在一个分支里提交的改变移到另一个分支里重放一遍。

Git鼓励大量使用分支：
查看分支：`git branch`
创建分支：`git branch <name>`
切换分支：`git checkout <name>`
创建+切换分支：`git checkout -b <name>`
合并某分支到当前分支：`git merge <name>`
删除分支：`git branch -d <name>`


如果meger的时候出现冲突怎么办？
我们需要手动修改冲突文件，再提交`git add demo.html` `git commit -m 'conflict fixed'`
用带参数的 `git log` 也可以看到分支的合并情况：
`git log --graph --pretty=oneline --abbrev-commit`
最后删除分支`dev`。

> 当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

用`git log --graph` 命令可以看到分支合并图。

通常，合并分支时，如果可能，Git会用`Fast froward`模式，但这种模式下，删除分支后，会丢掉分支信息。
如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
`--no-ff`方式的`git merge`。
`git merge --no-ff -m 'merge  with no-ff' dev`
因为本次合并要创建一个新的commit，所以加上`-m`参数，把commit描述写进去。

---
首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
你和你的小伙伴每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。
---

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。


---
Bug分支
当你接一个修复一个代号101的bug任务是，很自然地，你想创建一个分支issue-101来修复它，但是，等等，当前正在dev上进行的工作还没有提交、并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复bug，怎么办？
幸好，Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：
`git stash`
修改完bug后，回到当前分支上继续干活
工作区是干净的，刚才的工作现场存到哪里去了？用`git stash list`命令查看：
`git stash list`
工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：
一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；
另一种方式时用git stash pop，恢复的同时把stash内容也删了；
你可以多次stash,恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：
`git stash apply stash@{0}`

---
Git友情提示，dev分支还没有被合并， 如果删除，将丢失掉修改，如果要强行删除，需要使用命令`git branch -D dev`。

---
##### 推送分支
推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：
`git push origin master`
如果要推送其他分支，比如`dev`，就改成：
`git push origin dev`


当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的master分支，
现在，你的小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支。

推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送。
git pull 也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接，根据提示，设置dev和origin/dev的链接。
`git branch --set-upstream dev origin/dev`
再pull。
因此，多人协作的工作模式通常是这样：
1.首先，可以试图用`git push origin branch-name`推送自己的修改；
2.如果推送失败，则因为远程分支比你的本地更新，需要先用git pull 试图合并；
3.如果合并有冲突，则解决冲突，并在本地提交；
4.没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功；
如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`。


----
#### 标签管理
发布一个版本是，我们通常现在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。
相比于commit的版本号(40为16进制)，标签号则要好使的多。
所以，tag就是一个让人容易记住的有意义的名字，它跟某个commit绑定在一起。

`git tag <name>`就可以打一个新标签。
`git tag v1.0`
可以用命令`git tag`查看所有标签。

默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办？
方法是找到历史提交的commit id，然后打上就可以了。
`git log --pretty=oneline --abbrev-commit`
比方说要对 add merge 这次提交打标签，它对应的commit id是6224937，敲入命令：
`git tag v1.1 6224937`
再用命令`git log` 查看标签：
可以用`git show <tagname>` 查看标签信息。
还可以创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字。
`git tag -a v1.0 -m 'version 1.0 released' 3628166`
然后用命令`git shwo <tagname>`可以看到说明文字。
如果标签打错了，也可以删除：
`git tag -d v1.0`
如果要推送某个标签到远程，使用命令`git push origin <tagname>`
`git push origin v1.0`
如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除：
`git tag -d v1.0`
然后，从远程删除。删除命令也是push，但是格式如下：
`git push origin :refs/tags/v1.0`

---
#### 配置文件
配置Git的时候，加上`--global` 是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。
配置文件放哪了？每个仓库的Git配置文件都放在`.git/config`文件中，在这份配置文件中，别名就在[alias]后面，要删除别名，直接把对应的行删掉即可。













---
可能有同学会问了，为什么我把我生成的 ssh key 添加到了 github 中
然后 也 remote 了 https://github.com/Neveryu/learn-demo.git
为什么提交的时候报错，或者提示 输入密码账号是为什么

