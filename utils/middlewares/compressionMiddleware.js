import compression from "compression";

export default (app) => {
  app.use(compression());
};
