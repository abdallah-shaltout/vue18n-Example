<template>
  <main>
    <header>
      <div class="container">
        <ul class="flex itesm-center gap-5 justify-center text-xl py-4">
          <li>
            <RouterLink
              :to="
                $localPath({
                  name: 'home',
                })
              "
              >{{ $t('nav.home') }}</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="
                $localPath({
                  name: 'about',
                })
              "
              >{{ $t('nav.about') }}</RouterLink
            >
          </li>

          <li>
            <select
              name=""
              id=""
              @change="
                (event: Event) => {
                  const target = event.target as HTMLSelectElement
                  const newLocale = target.value
                  $switchLang(newLocale)
                }
              "
            >
              <option :selected="$i18n.locale === 'ar'" value="ar">
                {{ $t('locale.ar') }}
              </option>
              <option :selected="$i18n.locale === 'en'" value="en">
                {{ $t('locale.en') }}
              </option>
            </select>
          </li>
        </ul>
      </div>
    </header>
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { switchLanguage } from './i18n/translation'

const router = useRouter()
const switchLang = async (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newLocale = target.value
  switchLanguage(newLocale)
  router.replace({ params: { locale: newLocale } })
}
</script>
