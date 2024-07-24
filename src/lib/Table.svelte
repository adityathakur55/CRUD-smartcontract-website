<script>
    export let names;
    let editIndex = null; // To keep track of the row being edited

    // @ts-ignore
    function enableEdit(index) {
        editIndex = index;
    }

    function disableEdit() {
        editIndex = null;
    }
</script>

<div
	class="mt-10 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
>
	<div class="flex items-center justify-between mb-4">
		<div class="space-y-1">
			<h2 class="text-xl font-semibold">List of Users</h2>
			<p class="text-sm text-gray-500">
				Fetched {names.length} users
			</p>
		</div>
	</div>
	<div class="divide-y divide-gray-900/5">
		{#each names as user, index (user.id)}
			<div class="flex items-center justify-between py-3">
				{#if editIndex === index}
					<!-- Edit Mode -->
					<form method="POST" action="/profiles?/update">
						<input type="hidden" name="id" value={user.id}>
						<input type="text" name="name" placeholder="New name" value={user.name}>
						<input type="email" name="email" placeholder="New email" value={user.email}>
						<button type="submit">Save</button>
						<button type="button" on:click={disableEdit}>Cancel</button>
					</form>
				{:else}
					<!-- View Mode -->
					<div class="flex items-center space-x-4">
						<div class="flex">
							<p class="font-medium pt-1 leading-none">{user.name}</p>
							<p class="font-medium pl-5 text-gray-500 pt-0">{user.email}</p>                        
						</div>
					</div>
					<button on:click={() => enableEdit(index)}>
						<img class="w-4 float-right" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="update"/>
					</button>
					<form method="POST" action="/profiles?/delete">
						<input type="hidden" name="id" value={user.id}>
						<button type="submit">
							<img class="w-4 float-right" src="./trash-can.svg" alt="delete"/>
						</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</div>
