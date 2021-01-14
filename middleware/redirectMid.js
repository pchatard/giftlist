export default function ({ $auth, redirect, route }) {
    if (!$auth.loggedIn) {
        redirect(`/login?redirect=${route.path}`);
    }
}
