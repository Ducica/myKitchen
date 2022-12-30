import { Task } from "./entities/tasks";
import { Options, MigrationsOptions } from "@mikro-orm/core";


const migrations: MigrationsOptions = {
    path:  `${__dirname}/migrations`,
    glob: '!(*.d).{js,ts}',
};
const config: Options = {
    migrations,
    entities: [Task],
    dbName: "taskmanager",
    user: "postgres",
    password: "Ducciano89!",
    debug: true,
    type: "postgresql",
    forceUtcTimezone:true
};

export default config;

