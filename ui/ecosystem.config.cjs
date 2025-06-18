module.exports = {
    apps: [
        {
            name: "smart_repossession",  // Change to your app name
            script: "./app.js",  // Path to your Express.js entry file
            instances: "max",  // Use all available CPU cores
            exec_mode: "cluster",  // Enable cluster mode
            watch: false,  // Disable auto-restart on file changes
            node_args: "--env-file=.env --max-old-space-size=4096 --expose-gc",  // Set Node.js memory limit and enable GC
        }
    ]
};
