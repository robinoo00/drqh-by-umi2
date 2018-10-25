export default {
    base: './',
    publicPath: './',
    history: 'hash',
    browserslist: [
        "> 1%",
        "last 2 versions",
        "iOS >= 7",
        "Android > 4.1",
        "Firefox > 20",
    ],
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: true,
            title: 'celve-by-umi2.0',
            dll: true,
            pwa: false,
            routes: {
                exclude: [
                    /components/,
                    /component/,
                    /models/,
                    /services/,
                    /service/,
                    /images/,
                    /styles/,
                ],
            },
            hardSource: false,
        }],
    ],
}
