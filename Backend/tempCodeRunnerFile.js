if(!req.session.user) {
        console.log("no user");
        return;
    }
    console.log(req.session.user.email);
    const data = await UserDetail.find({ email:req.session.user.email})
    console.log(data[0].address);
    res.json(data[0].address);