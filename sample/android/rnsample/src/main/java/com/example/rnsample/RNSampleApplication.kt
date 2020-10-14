package com.example.rnsample

import android.app.Application
import android.content.Context
import androidx.multidex.MultiDex

class RNSampleApplication : Application() {
    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        MultiDex.install(this)
    }
}