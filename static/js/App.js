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

    addUser() {
        console.log(this)
        var userInfo = {
            //name: this.refs.name.value,
            //age: this.refs.age.value,
            //skill: this.refs.skill.value
            abc: 'dsfdsfdsf'
        };
        $.post("/addUser", userInfo, function (data) {            //save data to server

        });
    }

    render() {
        return(
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
        return(
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

class BodyList extends React.Component {
    render() {
        return(
            <tbody>
                <tr>
                    <td>user1</td>
                    <td>18</td>
                    <td>architect</td>
                    <td className="action">
                        <button className="btnEdit">Edit</button>
                        <button className="btnDelete">Delete</button>
                    </td>
                </tr>
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