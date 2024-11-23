import app from "./app";
const port = 5000;

const main = async() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    })
}

main();

