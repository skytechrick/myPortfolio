import('./app.js').then((module) => {
    const app = module.default;

    app.listen(83, () => {
        console.log(`Server running on port ${83}`);
    });
});
