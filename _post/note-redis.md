【聊聊redis的事务处理】
众所周知，事务是指“一个完整的动作，要么全部执行，要么什么也没有做”。
在聊redis事务处理之前，要先和大家介绍四个redis指令，即MULTI、EXEC、DISCARD、WATCH。这四个指令构成了redis事务处理的基础。
1.MULTI用来组装一个事务；
2.EXEC用来执行一个事务；
3.DISCARD用来取消一个事务；
4.WATCH用来监视一些key，一旦这些key在事务执行之前被改变，则取消事务的执行。
关于redis，这篇文章写的很详细啊(http://www.jb51.net/article/56448.htm)

