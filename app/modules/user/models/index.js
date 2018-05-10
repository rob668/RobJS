class Users extends APP.DB.DBModel{

    constructor(){
        super()

        this.tableName = "user"

        this.fields = {
            name: {type: "int(11)"},
            pwd: {type: "int(11)"},
            last_seen: {type: "int(11)"}
        }
    }

    //添加一个获取用户列表的方法
	getUserList (pars) {
        let condition = {
            //返回的字段
            attributes: ['username', 'sex', 'id', 'address'],
            limit: 10
        }
        return this.query(condition)
    }

    //获取用户详细信息
    getDetail(id){
        let condition = {
            //返回的字段
            attributes: ['username', 'sex', 'id', 'address'],
            //查询的条件
            where: { id: id }
        }
        return this.getone(condition);
    }

    //判断用户是否在组内
    async userInGroup(gid, uid){
        let GroupModel = APP.DB.getModel('UsersGroupModel')
        let isExist = GroupModel.getone({where:{"userid": uid, "id":gid}})

        return isExist != null
    }
}

class UsersGroup extends APP.DB.DBModel{
    constructor(){
        super()

        this.tableName = "user_group"

        this.fields = {
            userid: {type: "int(11)"},
            status: {type: "tinyint(1)"}
        }
    }
}

module.exports = APP.DB.regModel({
    "UserModel": Users,
    "UsersGroupModel": UsersGroup
})