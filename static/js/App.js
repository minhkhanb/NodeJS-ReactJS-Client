let cUsers;

class Title extends React.Component {
    render() {
        return (
            <div className="title">
                <span>User management</span>
            </div>
        );
    }
}

class FormItem extends React.Component {
    constructor(props) {
        super(props);
        this.addUser = this.addUser.bind(this);
    }

    clearInput() {
        this.refs.name.value = '';
        this.refs.age.value = '';
        this.refs.skill.value = '';
    }

    addUser() {
        var that = this;
        var userInfo = {
            name: this.refs.name.value,
            age: this.refs.age.value,
            skill: this.refs.skill.value
        };
        $.post("/addUser", userInfo, function (data) {            //save data to server
            cUsers.state.users = data;
            cUsers.setState(cUsers.state);
            that.clearInput();
        });
    }

    render() {
        return (
            <div>
                <div className="control-group">
                    <div className="label">
                        <span>User</span>
                    </div>
                    <div className="input">
                        <input type="text" ref="name" placeholder="Name"/>
                    </div>
                </div>
                <div className="control-group">
                    <div className="label">
                        <span>Age</span>
                    </div>
                    <div className="input">
                        <input type="text" ref="age" placeholder="Age..."/>
                    </div>
                </div>
                <div className="control-group">
                    <div className="label">
                        <span>Skill</span>
                    </div>
                    <div className="input">
                        <input type="text" ref="skill" placeholder="Skill..."/>
                    </div>
                </div>
                <div className="control-group">
                    <div className="input">
                        <button onClick={this.addUser}>Add</button>
                    </div>
                </div>
            </div>
        );
    }

}

class Form extends React.Component {
    render() {
        return (
            <div className="form">
                <FormItem/>
            </div>
        );
    }
}

class HeadList extends React.Component {
    render() {
        return (
            <thead>
            <tr>
                <th>User</th>
                <th>Age</th>
                <th>Skill</th>
                <th>Action</th>
            </tr>
            </thead>
        );
    }
}

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.cancelUser = this.cancelUser.bind(this);

        this.state = {
            onEdit: false
        }
    }

    deleteUser(e) {
        var idUser = e.target.parentNode.parentNode.getAttribute('id');
        $.post('/deleteUser', {idDelete: idUser}, function (data) {
            cUsers.state.users = data;
            cUsers.setState(cUsers.state);
        });
    }

    editUser() {
        this.state.onEdit = true;
        this.setState(this.state);
    }

    saveUser(e) {
        var that = this;
        var userInfo = {
            name: this.refs.name.value,
            age: this.refs.age.value,
            skill: this.refs.skill.value
        };
        var idEdit = e.target.parentNode.parentNode.getAttribute('id');
        $.post('/updateUser', {
            idEdit: idEdit,
            name: userInfo.name,
            age: userInfo.age,
            skill: userInfo.skill
        }, function (data) {
            that.state.onEdit = false;
            that.setState(that.state);
            cUsers.state.users = data;
            cUsers.setState(cUsers.state);
        });
    }

    cancelUser() {
        this.state.onEdit = false;
        this.setState(this.state);
    }

    render() {
        if (this.state.onEdit) {
            return (
                <tr id={this.props.idx}>
                    <td>
                        <input defaultValue={this.props.user.name} type="text" ref="name"/>
                    </td>
                    <td>
                        <input defaultValue={this.props.user.age} type="text" ref="age"/>
                    </td>
                    <td>
                        <input defaultValue={this.props.user.skill} type="text" ref="skill"/>
                    </td>
                    <td className="action">
                        <button className="btnEdit" onClick={this.saveUser}>Save</button>
                        <button className="btnDelete" onClick={this.cancelUser}>Cancel</button>
                    </td>
                </tr>
            );
        }
        else {
            console.log('sdfdsfsd', JSON.stringify(this.props.user, null, 2), this.props.user.name)
            return (
                <tr id={this.props.idx}>
                    <td>{this.props.user.name}</td>
                    <td>{this.props.user.age}</td>
                    <td>{this.props.user.skill}</td>
                    <td className="action">
                        <button className="btnEdit" onClick={this.editUser}>Edit</button>
                        <button className="btnDelete" onClick={this.deleteUser}>Delete</button>
                    </td>
                </tr>
            );
        }
    }
}

class BodyList extends React.Component {
    constructor(props) {
        super(props);
        cUsers = this;
        this.state = {
            users: []
        };

    }

    render() {
        return (
            <tbody>
            {
                this.state.users.map(function (user, i) {
                    return (
                        <Row user={user} idx={i} key={i}/>
                    );
                })
            }
            </tbody>

        );
    }
}

class UserList extends React.Component {
    render() {
        return (
            <div className="listUser">
                <table>
                    <HeadList/>
                    <BodyList/>
                </table>
            </div>
        );
    }
}

class AddUser extends React.Component {
    render() {
        return (
            <div className="addUser">
                <Title/>
                <Form/>
                <UserList/>
            </div>
        );
    }
}

ReactDOM.render(
    <AddUser/>,
    document.getElementById('app')
);