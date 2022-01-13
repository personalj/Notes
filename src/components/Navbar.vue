<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="info"
    class="justify-content-between px-2 mb-3"
  >
    <b-navbar-brand to="/"> Notes </b-navbar-brand>
    <b-navbar-nav class="ml-auto flex">
      <b-nav-item to="/" exact exact-active-class="active"> Notes </b-nav-item>
      <b-nav-item to="/create-note" exact exact-active-class="active">
        Create
      </b-nav-item>
      <b-nav-item to="/settings" exact exact-active-class="active">
        Settings
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
