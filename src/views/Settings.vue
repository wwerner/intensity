<template>
  <div class="settings">
    <h1>Einstellungen</h1>
    <v-btn @click="$store.commit('deleteHistory')" color="warning">Verlauf löschen</v-btn>
  </div>
</template>
