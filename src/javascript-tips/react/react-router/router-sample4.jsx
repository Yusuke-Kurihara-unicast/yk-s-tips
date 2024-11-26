/**
 * パスパラメータごとにルーティングできる
 */
<Route path="/articles">
    <Route path=":articleId" element={<Article />} loader={articleLoader} />
    <Route path=":name" element={<ArticleName />} loader={articleLoader} />
</Route>

// パスパラメータは params で拾ってこれる
export const articleLoader = async ({ params }) => {
    return defer({
        commentPromise: fetchComment(params.articleId),
        article: await fetchArticle(params.articleId),
    });
};

export const Article = () => {
    // loaderなどから取得しない場合はuseParamsで取得する
    const { articleId } = useParams();
    const { article } = useLoaderData();
    return (
        <div>
            <h1>{article.name}</h1>
            <Comment />
        </div>
    );
};

/**
 * クエリパラメータはuseSearchParamsから取得できるし、setSearchParamsでセットすることもできる
 * セットするとadrが実行される
 */
const [searchParams, setSearchParams] = useSearchParams();