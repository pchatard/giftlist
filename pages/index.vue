<template>
    <main>
        <div class="landing">
            <section class="hero">
                <img src="@/assets/images/LogoBig.png" alt="Gift Logo" />
                <h1>GiftList</h1>
                <p>The ultimate wishlist app</p>
                <NuxtLink to="/login" tag="button" class="btn btn-list">
                    Start now
                </NuxtLink>
            </section>
            <section class="about">
                <h2>How it works</h2>
                <div class="details">
                    <div>
                        <img
                            src="@/assets/images/ListIcon.png"
                            alt="List Icon"
                        />
                        <h3>Create</h3>
                        <ul>
                            <li>Create and manage your wishlists.</li>
                            <li>
                                Add gift ideas and specify the ones you prefer
                                by marking them as favorites.
                            </li>
                            <li>
                                Specify the color, the size or the brand of your
                                favorite items.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <img
                            src="@/assets/images/icons/SharedDark.png"
                            alt="Share Icon"
                        />
                        <h3>Share</h3>
                        <ul>
                            <li>
                                Share your wishlists with your friends, family
                                or guests so they can see what you want.
                            </li>
                            <li>
                                This is as simple as giving them a sharing link.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <img
                            src="@/assets/images/GiftIcon.png"
                            alt="Gift Icon"
                        />
                        <h3>Offer</h3>
                        <ul>
                            <li>Choose what you offer to your friend.</li>
                            <li>
                                Browse their list and book what you'll buy them.
                            </li>
                            <li>
                                The list displays which items are available, and
                                which are taken.
                            </li>
                        </ul>
                    </div>
                </div>

                <NuxtLink to="/login" tag="button" class="btn btn-list">
                    Start now
                </NuxtLink>
            </section>
        </div>
    </main>
</template>
