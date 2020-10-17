exports.getUser = (req, res) => {
    res.send("Get user data")
}

// create new user
exports.createUser = (req, res) => {
    var data = req.body;
    var user = {
        fullName: data.name,
        email: data.email,
        password: data.password
    }

    console.log(user);
    res.send(user);
}

// Update user information

exports.updateUser = (req, res) => {
    res.send("update user data!")
}

// Delete user data

exports.deleteUser = (req, res) => {
    res.send("Delete user data")
}