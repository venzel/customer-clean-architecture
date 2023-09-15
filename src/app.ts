import { Main } from './main';

const main = new Main();

main.initBanner()
    .initEnvs()
    .initLogger()
    .initDB()
    .then((res) => {
        res.initRoutes()
            .then((res) => {
                res.initError();
                res.initServer();
            })
            .catch((e) => {
                throw new Error(e);
            });
    })
    .catch((e) => {
        throw new Error(e);
    });
