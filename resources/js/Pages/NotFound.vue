<template lang="">
    <div class="main-wrapper">
            <div class="error-box">
				<div class="error-img">
                    <img :src="url + '/assets/img/authentication/error-404.png'" class="img-fluid" alt="Img">
                </div>
				<h3 class="h2 mb-3">Oops, something went wrong</h3>
				<p>Error 404 Page not found. Sorry the page you looking for
                    doesn’t exist or has been moved</p>
				<a href="index.html" class="btn btn-primary">Back to Dashboard</a>
			</div>
        </div>
</template>
<script>
export default {
    data() {
        return {
            url: window.location.origin
 
        }
    },
}
</script>
<style lang="">
    
</style>