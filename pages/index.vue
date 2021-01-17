<template>
    <main>
        <div class="landing">
            <section class="hero">
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
                        <p>Create and manage your wishlists.</p>
                        <p>
                            Add gift ideas and specify the ones you prefer by
                            marking them as favorites.
                        </p>
                        <p>
                            Specify the color, the size or the brand of your
                            favorite items.
                        </p>
                    </div>
                    <div>
                        <img
                            src="@/assets/images/icons/SharedDark.png"
                            alt="Share Icon"
                        />
                        <h3>Share</h3>
                        <p>
                            Share your wishlists with your friends, family or
                            guests so they can see what you want.
                        </p>
                        <p>This is as simple as giving them a sharing link.</p>
                    </div>
                    <div>
                        <img
                            src="@/assets/images/GiftIcon.png"
                            alt="Gift Icon"
                        />
                        <h3>Offer</h3>
                        <p>Choose what you offer to your friend.</p>
                        <p>Browse their list and book what you'll buy them.</p>
                        <p>
                            The list displays which items are available, and
                            which are taken.
                        </p>
                    </div>
                </div>

                <NuxtLink to="/login" tag="button" class="btn btn-list">
                    Start now
                </NuxtLink>
            </section>
        </div>
    </main>
</template>
