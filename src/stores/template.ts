import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useTemplateStore = defineStore('template', () => {

  // Colors & Themes
  const appTheme = useStorage<'light' | 'dark'>('templateMode', 'light')
  function toggleTheme() {
    appTheme.value = appTheme.value == 'dark' ? 'light' : 'dark';
  }


  // Data
  const sidebarmenu = reactive<{ heading?: string, menu: { title: string, icon: string, link?: string, children?: any[] }[] }[]>([
    {
      heading: 'MAIN',
      menu: [
        { title: "Dashboard", icon: "<i class='bi bi-house-fill'></i>", link: "/account/dashboard" },
        { title: "Clients", icon: " <i class='bi bi-person-fill'></i>", link: "/account/clients" },
        { title: "Checks", icon: "<i class='bi bi-check-lg'></i>", link: "/account/checks" },
        { title: "Tools", icon: "<i class='bi bi-tools'></i>", link: "/account/tools" },
      ]
    },

    {
      heading: 'ADMINISTRATIVE TASK',
      menu: [
        { title: "Audit Report", icon: "<i class='bi bi-columns-gap'></i>", link: "/account/audit-report" },

      ]
    },

    {
      heading: 'HELP AND SETTINGS',
      menu: [
        { title: "Help & Support", icon: "<i class='bi bi-question-circle'></i>", link: "/account/help-and-support" },
        { title: "Settings", icon: "<i class='bi bi-gear-fill'></i>", link: "/account/settings" },

      ]
    },
    // {
    //   heading: 'other',
    //   menu: [
    //     {
    //       title: "Dropdown",
    //       icon: " <i class='bi bi-bar-chart-fill'></i>",
    //       children: [
    //         { title: "Dropdown Link1", link: "/account/dropdown1" },
    //         { title: "Dropdown Link2", link: "/account/dropdown2" },
    //         { title: "Dropdown Link3", link: "/account/dropdown3" }
    //       ]
    //     },
    //   ]
    // }
  ]);



  return {
    appTheme,
    toggleTheme,
    sidebarmenu
  }
})
