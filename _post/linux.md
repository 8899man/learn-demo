CentOS 打开终端 `ctrl+alt+f2` 退出终端 `ctrl+alt+f1`
linux 是有别于 unix 的另一种操作系统
pwd：当前文件路径
cat -n test.php   --   显示行号
more test.php   --  空格翻页，回车向下滚动一行

head -n 10 unittest.php    --  从头显示10行
tail -n 10 unittest.php     --   从尾显示10行

less unittest.php

grep  --  查找
find  --  搜索
locate  --  快速定位  --  locate *.doc
whereis   --  查找特定程序  --  whereis find
who   --  查看当前系统中有哪些人登录  whoami
uname  --  显示当前系统的版本信息
uname -r    --  显示内核版本信息
man  --  获取某个命令的帮助信息

man手册中的内容太多了，如果只想知道一个命令大概可以做些什么
whatis  --  whatis  find

mkdir  --  建立目录
touch  --  建立一个空文件

mv  --  移动和重命名
mv移动文件的时候，如果目标文件夹中有同名文件的话，就会覆盖掉，而且没有提示
所以我们使用mv -i
mv -i hello test/
mv:是否覆盖”test/hello”?
cp  --  复制文件和目录
rmdir和rm  -  删除目录和文件
rmdir只能删除空目录，绝大多数情况我们使用rm
rm -i 提示是否删除

权限
读取(r)、写入(w)、执行(x)。

改变文件所有权：chrown和chgrp
chown coco:root test.php   -- 改属主，改属组
chown coco test.php    --    改属主
chown :root test.php    --     改属组



改变目录及其下所有文件的所有权设置
chown -R coco info/      -  将info/和其下所有的文件交给用户coco

 chgrp用于设置文件的属组
chgrp nogroup test.php

chmod改变文件权限
chomd u+x test.php
chomd a-x test.php


建立链接  --  ln
符号链接(也被称作“软链接”)需要使用带-s参数的ln命令来创建。
ln -s TARGET LINK_NAME  --  给目标文件TARGET取了一个别名LINK_NAME。


linux中还有一种链接被称为“硬链接”。
这种链接用于将两个独立的文件联系在一起。硬链接和符号链接本质的不同在于：硬链接是直接引用，而符号链接是通过名称进行引用。
使用不带选项的ln命令建立硬链接。
ln days hard_days

这两个文件拥有相同的内容，对其中一个文件的改动会反映在另一个文件中。用熟悉的文本编辑器打开days，删除最后两行，可以看到hard_days中的内容也改变了。

管道  |
ls | grep ay
管道接收ls的输出，并把它们发送给grep命令作为其输入。
可以在一行命令中使用多个管道，从而构造出复杂的shell命令。
合理使用管道是提高工作效率的有效手段。

两种格式的解压：
tar -zxvf Mplayer-1.1.tar.gz
tar -jxvf Blue-1.8.tar.bz2

Linux上所有的软件都使用configure这个脚本来配置以源代码形式发布的软件。
几乎所有的configure脚本都提供了--prefix这个选项，用于指定软件安装的位置。
如果用户不指定，那么软件就按照其默认的路径设置安装自己。
下面这条命令指定将软件安装在/usr/local/games/foobillard目录下
./configure --prefix=/usr/local/games/foobillard



将软件安装在/usr/local目录下是一个好习惯，这样可以的安装在/usr目录下的系统工具有效的区分开来。

通过mount命令可以挂载文件系统。

gzip是目前Linux下使用最广泛的压缩工具。
gzip linux_book_bak.tar

打包工具tar
下面这条命令将shell目录连同其下的文件统一打包成问价shell.tar
tar -cvf sheel.tar sheel/


第九章、用户与用户组管理







































