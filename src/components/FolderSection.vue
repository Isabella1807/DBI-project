<script lang="ts" setup>
  // Define a prop to switch between views: "detailed" or "list"
  const props = defineProps({
    view: {
      type: String,
      default: 'detailed'  // default to detailed view; use "list" for list view
    }
  });

  // Dummy folder data
  const folders = [
    { id: 1, name: "Mappe A" },
    { id: 2, name: "Mappe B" },
    { id: 3, name: "Mappe C" },
    { id: 4, name: "Mappe D" },
    { id: 5, name: "Mappe E" },
    { id: 6, name: "Mappe F" }
  ];
</script>

<template>
  <!-- Parent container that applies different layouts based on view -->
  <div :class="['folder-container', props.view]">
    <!-- Render each folder item -->
    <div 
      v-for="folder in folders" 
      :key="folder.id" 
      :class="['folder', props.view]"
    >
      <div class="folder-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="81" viewBox="0 0 80 81" fill="none">
          <path d="M10 20.5V56.5C10 60.2337 10 62.0992 10.7266 63.5253C11.3658 64.7797 12.3849 65.8016 13.6393 66.4408C15.064 67.1667 16.93 67.1667 20.6564 67.1667H59.3436C63.07 67.1667 64.9333 67.1667 66.358 66.4408C67.6124 65.8016 68.6349 64.7804 69.2741 63.526C70.0007 62.0999 70.0007 60.233 70.0007 56.4994L70.0007 31.1659C70.0007 27.4323 70.0007 25.5654 69.2741 24.1393C68.6349 22.8849 67.613 21.8658 66.3586 21.2266C64.9325 20.5 63.067 20.5 59.3333 20.5H40M10 20.5H40M10 20.5C10 16.8181 12.9848 13.8333 16.6667 13.8333H28.9151C30.5457 13.8333 31.3629 13.8333 32.1301 14.0175C32.8104 14.1809 33.4595 14.4509 34.056 14.8164C34.7286 15.2286 35.306 15.8061 36.4583 16.9583L40 20.5" stroke="#707070" stroke-width="6.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>{{ folder.name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Parent container styles for detailed view: grid of 5 cards per row */
.folder-container.detailed {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 20px;
}

/* Parent container styles for list view: vertical list */
.folder-container.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Detailed view styles for individual folder card */
.folder.detailed .folder-content {
  display: flex;
  width: 180px;
  height: 180px;
  padding: 40px 42px 11px 42px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.10);
  border-radius: 16px;
  background: $white;

  svg {
    flex-shrink: 0;
  }

  p {
    @include bodyText;
    text-align: center;
    width: 96px;
    height: 39px;
    flex-shrink: 0;
  }
}

/* List view styles for individual folder item */
.folder.list .folder-content {
  display: flex;
  width: 100%;      /* Takes the full available width */
  height: 60px;     /* Reduced height for list view */
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #ccc; /* Optional: separator between items */
  background: $white;

  /* Adjust the SVG icon size for list view */
  svg {
    width: 40px;
    height: 40px;
  }

  /* Adjust text styling for list view */
  p {
    @include bodyText;
    text-align: left;
    margin: 0;
    flex-grow: 1;   /* Let text take the remaining space */
  }
}
</style>