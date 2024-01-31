enum Action {
    Run,
    Build,
    Docs,
    Dependency, //could add/remove [path to file]
    Init, //must call before other things will worl
}

// init will create a kettle.json file
// all other commands rely of kettle.json to run

export default Action;