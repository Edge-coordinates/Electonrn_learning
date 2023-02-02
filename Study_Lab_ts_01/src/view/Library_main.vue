<template>
    <div style="padding-left: 5%; padding-right: 5%">
        <h2>书库</h2>
        <h3>碎碎念</h3>
        <ul>
            <li>因为选用vite的原因，渲染进程支持node一直没有搞好（找了1天的文档），虽然用ipc可以做到，但是过于麻烦，就放弃了，现在数据库使用的Indexdb，做存储有点麻烦，首页就不写了。</li>
            <li><s>额，开发模式PDF,EPUB的预览没有问题，要不你们用开发模式试试？？？生产模式大概是路径配置错误吧？我懒得调整了QAQ</s>，嗯，已经修好了。</li>
        </ul>
        <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
            <n-grid-item>
                <n-card title="书" hoverable> 一本书 </n-card>
            </n-grid-item>
            <n-grid-item>
                <n-card title="书" hoverable> 一本书 </n-card>
            </n-grid-item>
            <n-grid-item>
                <n-card title="书" hoverable> 一本书 </n-card>
            </n-grid-item>
            <n-grid-item>
                <n-card title="书" hoverable> 一本书 </n-card>
            </n-grid-item>
            <n-grid-item>
                <n-card title="书" hoverable> 一本书 </n-card>
            </n-grid-item>
            <n-grid-item>
                <n-card title="书" hoverable> 一本书 </n-card>
            </n-grid-item>
            <n-grid-item>
                <n-card title="书" hoverable> 一本书 </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>
