export default async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end("Method Not Allowed");
    }

    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    newUser.save();

    try {
        let newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        newUser.save();

        res.writeHead(302, { Location: "/Pages/HomePage.html" });
        res.end();

    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
};