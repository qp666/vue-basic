//后端接口统一管理
module.exports = {
    //公共资源--文件上传
    getTempFileToken: "admin.file.cos.token", //获取临时上传凭证
    getFileResourceId: "admin.file.bind", //获取文件资源ID
    getFileInfo: "admin.file.info", //获取文件信息
    getTagsByType: "et_admin.tag.lists", //根据类型获取标签列表
    getFrameList: "admin.frame.lists", //架构树列表

    //系统菜单
    addSubSystem: "admin.module.addSource", //添加子系统
    updateSubSystem: "admin.module.editSource", //编辑子菜单
    removeSubSystem: "admin.module.delSource", //删除子系统
    getSubSystemList: "admin.module.getSourceList", //获取子系统列表
    addFunctionPermission: "admin.permission.editPermissions", //增加和编辑功能权限
    removeFunctionPermission: "admin.permission.delPermissions", //删除功能权限

    //角色管理
    addRole: "admin.module.addRole", //添加角色
    getRoleList: "admin.module.roleList", //获取角色列表
    updateRole: "admin.module.editRole",//更新角色

    //模块管理
    getModule: "admin.module.getModule", //模块查询
    getModuleTree: "admin.permission.getPermissionsTree", //模块查询
    addModule: "admin.module.addPrivlegesModule", //添加模块

    //用户管理
    addUser: "admin.module.userAdd", //添加用户
    updateUser:'admin.module.userEdit',//更新用户
    getUserList: "admin.module.userList", //用户列表

    //账号管理
    addAccount: "admin.module.setMember", //添加账号
    getAccountList: "admin.module.memberList", //账号管理

    // 接口管理
    getAllRoutesByModule: "admin.module.getPrivlegesLists",
    addPrivlegesPath: "admin.module.addPrivlegesPath", //添加路由
    updatePrivlegesPath: "admin.module.updatePrivlegesPath", //编辑路由
    getRouteList: "admin.module.routeList", //获取所有路由列表
    delPrivlegesPath: "admin.module.delPrivlegesPath", //删除路由
    addMultipleRoute: "admin.module.batchAddRoute" //批量增加
};
