<script setup>
import BasicIcon from '../atoms/BasicIcon.vue';
</script>

<template>
    <div class="tableNav">
        <!-- Venstre side -->
        <div class="leftSection">
            <div class="tableNavItem">
                <input type="checkbox" id="selectAll" />
                <label for="selectAll">Markér alt</label>
            </div>

            <div class="divider"></div>

            <div class="tableNavItem disabled">
                <BasicIcon name="EditPencil" />
                <span>Rediger</span>
            </div>
            <div class="tableNavItem disabled">
                <BasicIcon name="copy" />
                <span>Kopier</span>
            </div>
            <div class="tableNavItem disabled">
                <BasicIcon name="ArrowUpRight" />
                <span>Flyt</span>
            </div>
            <div class="tableNavItem disabled">
                <BasicIcon name="Printer" />
                <span>Print</span>
            </div>
            <div class="tableNavItem disabled">
                <BasicIcon name="Trash" />
                <span>Slet</span>
            </div>
        </div>

        <!-- Højre side -->
        <div class="rightSection">
            <div class="tableNavIcon">
                <BasicIcon name="Filter" />
            </div>
            <div class="tableNavIcon">
                <BasicIcon name="ListUnordered" />
            </div>
            <div class="tableNavIcon active">
                <BasicIcon name="MoreGridSmall" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tableNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $white;
    border-radius: 1rem;
    padding: 0.75rem 1rem;
    margin-top: 2rem;

    .leftSection {
        display: flex;
        align-items: center;
        gap: 1rem;

        .tableNavItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.2rem;
            color: $black;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: background-color 0.2s ease;

            &:hover {
                background-color: $lightGreen;
            }

            &.disabled {
                opacity: 0.3;
                cursor: default;

                // stadig hover effekt hvis ønsket
                &:hover {
                    background-color: $lightGreen;
                }
            }
        }
    }

    .rightSection {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
    }

    .tableNavIcon {
        background-color: $lightGrey;
        padding: 0.4rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .divider {
        height: 1.5rem;
        width: 1px;
        background-color: $mediumGrey;
    }
}
</style>
