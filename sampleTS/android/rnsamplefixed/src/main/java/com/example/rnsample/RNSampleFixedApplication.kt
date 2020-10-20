package com.example.rnsamplefixed

import android.app.Application
import android.content.Context
import androidx.multidex.MultiDex

class RNSampleFixedApplication : Application() {
    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        MultiDex.install(this)
    }
}