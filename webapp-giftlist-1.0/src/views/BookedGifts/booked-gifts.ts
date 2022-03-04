import { defineComponent, ref } from "vue";

import labels from "@/labels/fr/labels.json";

import DefaultLayout from "@/components/Styled/DefaultLayout.vue";
import BookedGift from "@/components/Gift/BookedGift.vue";
import Modal from "@/components/Styled/Modal.vue";
import GiftDetails from "@/components/Gift/GiftDetails.vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "BookedGifts",
    components: {
        DefaultLayout,
        BookedGift,
        Modal,
        GiftDetails,
    },
    setup() {
        const router = useRouter();

        const bookedGifts = [
            {
                id: "a",
                title: "Cadeau A",
                price: 12.5,
                owner: "Harry Covère",
                list: { code: "ab", name: "Liste" },
            },
            {
                id: "b",
                title: "Cadeau B",
                price: 29.0,
                owner: "Anne Hiversère",
                list: { code: "cd", name: "Anniversaire" },
            },
            {
                id: "c",
                title: "Cadeau C",
                price: 78.99,
                owner: "Sophie Fonfec",
                list: { code: "ef", name: "Apéro" },
            },
            {
                id: "d",
                title: "Cadeau D",
                price: 8.7,
                owner: "Marion Noud",
                list: { code: "gh", name: "Mariage" },
            },
            {
                id: "e",
                title: "Cadeau E",
                price: 100.0,
                owner: "Bébé Brune",
                list: { code: "ij", name: "Naissance" },
            },
            {
                id: "f",
                title: "Cadeau F",
                price: 20,
                owner: "Arsène Lutin",
                list: { code: "kl", name: "Noël" },
            },
        ];

        const selectedGift = ref();

        const handleDetailsModal = (gift: any) => {
            modal.value.title = gift.title;
            modal.value.confirmText = "Ouvrir la liste";
            modal.value.cancelText = "Fermer";
            modal.value.showModal = true;
            modal.value.confirm = openList;
            selectedGift.value = gift;
        };

        const openList = () => {
            router.push("/app/shared/" + selectedGift.value.list.code);
        };

        const modal = ref({
            showModal: false,
            title: "",
            confirmText: "",
            cancelText: "",
            confirm: openList,
        });

        return { labels, bookedGifts, modal, handleDetailsModal, selectedGift };
    },
});