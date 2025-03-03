import path from 'path';

const ROOT_PATH = path.resolve();


const paths = {
    root: ROOT_PATH,
    env: {
        env: path.join(ROOT_PATH, ".env.dev"),
        prod: path.join(ROOT_PATH, ".env.prod"),
    },
    src: path.join(ROOT_PATH, "src"),
    public: path.join(ROOT_PATH, "public"),
    images: path.join(ROOT_PATH, "public/images"),
    views: path.join(ROOT_PATH, "src/views"),
}

export default paths;