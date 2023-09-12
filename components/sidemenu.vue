<template>
<div class="side_menu">
    <div class="nav_content">
        <div class="side_nav">
            <div class="nav_left">
                <fa :icon="['fa', 'comment']" /> &ensp;
                All Chats
            </div>
            <div class="nav_right">
                <fa :icon="['fa', 'angle-right']" />
            </div>
        </div>
        <div class="side_nav">
            <div class="nav_left">
                <fa :icon="['fa', 'folder']" /> &ensp;
                My Folder
            </div>
            <div class="nav_right">
                <fa :icon="['fa', 'angle-right']" />
            </div>
        </div>
        <div class="side_nav">
            <div class="nav_left">
                <fa :icon="['fa', 'trash']" /> &ensp;
                Trash
            </div>
            <div class="nav_right">
                <fa :icon="['fa', 'angle-right']" />
            </div>
        </div>

        <div class="side_nav">
            <div class="line"></div>
        </div>

        <div class="side_nav">
            <div class="nav_left">
                Terms &amp; Legal
            </div>
            <div class="nav_right"></div>
        </div>
        <div class="side_nav">
            <div class="nav_left">
                Contact Us
            </div>
            <div class="nav_right"></div>
        </div>
        <div class="side_nav">
            <div class="nav_left">
                Help &amp; FAQs
            </div>
            <div class="nav_right"></div>
        </div>

    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>