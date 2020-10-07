package com.example.rn_sample_android_lib;

import android.app.Application;
import android.content.Context;

import androidx.multidex.MultiDex;

public class RNSampleApplication extends Application {

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
}
