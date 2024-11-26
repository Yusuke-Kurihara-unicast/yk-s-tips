// base
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/path1" element={<h1>Path1</h1>} />
            <Route path="/parent" element={<Parent />}>
                <Route path="child" element={<h2>Child</h2>} />
            </Route>
        </Route>
    )
);

/* 
    Outlet 共通部品を用意する時に使う
    子階層のコンポーネントがOutletの位置に埋め込まれる
*/
const routerWithOutlet = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/user" element={<BaseLayout><Outlet /></BaseLayout>}>
                <Route path="" element={<DefaultContent />} />
                <Route path="products" element={<Products />} />
                <Route path="*" element={<NotFoundContent />} />
            </Route>
        </Route>
    )
);
