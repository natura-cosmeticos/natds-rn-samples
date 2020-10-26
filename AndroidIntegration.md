# Integrating our React Native module to an existing Android App

In this repository we have two sample modules we used to test the behaviour of [@naturacosmeticos/natds-rn](https://www.npmjs.com/package/@naturacosmeticos/natds-rn) and [@naturacosmeticos/natds-icons](https://www.npmjs.com/package/@naturacosmeticos/natds-icons) when integrated inside a native Android app.

Here we put together what we have learned in the process of developing this integration.

## Changes

### Enabling MultiDex

As seen on the [oficial documentation for Android](https://developer.android.com/studio/build/multidex#mdex-gradle) we had to enable MultiDex to allow our app to build and read multiple DEX files and avoid the `"Too many field references"` error.

That's because DEX files limits the total number of methods that can be referenced within it, including Android framework methods, library methods, and methods in your own code.

This is the modifications we did:

**1. In the module-level `build.gradle` file we enabled multidex and added the multidex library as a dependency**
<pre>
android {
    defaultConfig {
        ...
        <b>multiDexEnabled true</b>
    }
    ...
}

dependencies {
  <b>implementation 'androidx.multidex:multidex:2.0.0'</b>
}
</pre>
[sampleTS/android/app/build.gradle](sampleTS/android/app/build.gradle)

_
**2. Because it's not possible to change the base class but we can override the Application class, then we override the attachBaseContext() method and call MultiDex.install(this) to enable multidex**
<pre>
import androidx.multidex.MultiDex;
...

public class MainApplication extends Application implements ReactApplication {

    ...
    <b>
    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    </b>
    }
}
</pre>
[sampleTS/android/app/src/main/java/com/samplets/MainApplication.java](sampleTS/android/app/src/main/java/com/samplets/MainApplication.java)

_
####// TO DO
Test: remove this to see what happens


---
### Using Kotlin

Because we used Kotlin when writting our files, we made the following modifications:

**1. In the top-level `build.gradle`, where you can add configuration options common to all sub-projects/modules, we added Kotlin as a dependency**
<pre>
buildscript {
    ext {
        ...
        <b>kotlin_version = '1.3.72'</b>
    }
    ...
    dependencies {
        ...
        <b>classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"</b>
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
allprojects {
    ...
}
</pre>
[sampleTS/android/build.gradle](sampleTS/android/build.gradle)


---
### Creating an Android library

Quoting the [oficial documentation for Android](https://developer.android.com/studio/projects/android-library):
>An Android library is structurally the same as an Android app module. It can include everything needed to build an app, including source code, resource files, and an Android manifest. However, instead of compiling into an APK that runs on a device, an Android library compiles into an Android Archive (AAR) file that you can use as a dependency for an Android app module.

So, because we want our module to be consumed as a dependency inside an Android Application, we need it to be an Android Library.

Using *Android Studio* you can create a new Module inside the `Android` directory and select the module type "Android Library"

**1. The module-level `build.gradle` file (for the Library module)**
<pre>
<b>
apply plugin: 'com.android.library'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 30
    buildToolsVersion "30.0.1"

    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"
        multiDexEnabled true

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles "consumer-rules.pro"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    libraryVariants.all { variant ->
        variant.outputs.all { output ->
            if (outputFile != null && outputFileName.endsWith('.aar')) {
                outputFileName = "${archivesBaseName}.aar"
            }
        }
    }
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'androidx.appcompat:appcompat:1.1.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
    implementation 'com.facebook.react:react-native:0.63.3'
    implementation 'androidx.multidex:multidex:2.0.0'
}
</b>
</pre>
[sampleTS/android/rnsamplefixed/build.gradle](sampleTS/android/rnsamplefixed/build.gradle)

_
**2. The `AndroidManifest.xml` file (for the Library module)**
<pre>
<b>
&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.rnsamplefixed"&gt;

    &lt;application
        android:name=".RNSampleFixedApplication"&gt;

        &lt;activity
            android:name=".RNSampleFixedActivity"
            android:label="Library"
            android:theme="@style/Theme.AppCompat.Light.NoActionBar"/&gt;
    &lt;/application&gt;
&lt;/manifest&gt;
</b>
</pre>
[sampleTS/android/rnsamplefixed/src/main/AndroidManifest.xml](sampleTS/android/rnsamplefixed/src/main/AndroidManifest.xml)

_
**3. The `RNSampleFixedActivity.kt` file (for the Library module)**
<pre>
<b>
package com.example.rnsamplefixed

import android.annotation.TargetApi
import android.os.Build
import android.os.Bundle
import android.view.KeyEvent
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactRootView
import com.facebook.react.common.LifecycleState
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.facebook.react.shell.MainReactPackage

class RNSampleFixedActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler, PermissionAwareActivity {

    private var reactInstanceManager: ReactInstanceManager? = null
    private var permissionListener: PermissionListener? = null

    // region Lifecycle
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        try {
            val initialProperties = Bundle().apply {
                putString("user", "<COLOCAR_COD_CONSULTORA_AQUI>")
            }

            val reactRootView = ReactRootView(this)

            reactInstanceManager = ReactInstanceManager.builder()
                    .setApplication(application)
                    .setCurrentActivity(this)
                    .setBundleAssetName("index.android.bundle")
                    .setJSMainModulePath("index")
                    .addPackage(MainReactPackage())
                    .setUseDeveloperSupport(BuildConfig.DEBUG)
                    .setInitialLifecycleState(LifecycleState.RESUMED)
                    .build()

            reactRootView.startReactApplication(reactInstanceManager, "sample", initialProperties)
            setContentView(reactRootView)

            lastInstance = this
        } catch (exception: Exception) {
            println("An error occurred while starting React Native: $exception")
        }
    }

    override fun onPause() {
        super.onPause()
        reactInstanceManager?.onHostPause(this)
    }

    override fun onResume() {
        super.onResume()
        reactInstanceManager?.onHostResume(this, this)
    }

    override fun onDestroy() {
        super.onDestroy()
        reactInstanceManager?.onHostDestroy(this)
    }
    // endregion

    // region Permissions
    @TargetApi(Build.VERSION_CODES.M)
    override fun requestPermissions(permissions: Array<String>?, requestCode: Int, listener: PermissionListener?) {
        permissions?.let {
            permissionListener = listener
            requestPermissions(it, requestCode)
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        permissionListener?.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }
    // endregion

    // region Key events
    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }

    override fun onBackPressed() {
        reactInstanceManager?.onBackPressed() ?: super.onBackPressed()
    }

    override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
        reactInstanceManager?.let {
            if (keyCode == KeyEvent.KEYCODE_MENU) {
                it.showDevOptionsDialog()
                return true
            }
        }

        return super.onKeyUp(keyCode, event)
    }
    // endregion

    companion object {
        private var lastInstance: RNSampleFixedActivity? = null
    }
}
</b>
</pre>
[sampleTS/android/rnsamplefixed/src/main/java/com/example/rnsample/RNSampleFixedActivity.kt](sampleTS/android/rnsamplefixed/src/main/java/com/example/rnsample/RNSampleFixedActivity.kt)

_
**4. The `RNSampleFixedApplication.kt` file (for the Library module)**
<pre>
<b>
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
</b>
</pre>
[sampleTS/android/rnsamplefixed/src/main/java/com/example/rnsample/RNSampleFixedApplication.kt](sampleTS/android/rnsamplefixed/src/main/java/com/example/rnsample/RNSampleFixedApplication.kt)

_
**4. Including the Library module in the `settings.gradle` file**
<pre>
<b>include ':rnsamplefixed'</b>
rootProject.name = 'sampleTS'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'
</pre>
[sampleTS/android/settings.gradle](sampleTS/android/settings.gradle)

---
### Using scripts

We used Yarn, but the same scripts can be used with NPM.
<pre>
{
  "name": "sampleTS",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    <b>"android:build:bundle": "react-native bundle  --entry-file='index.js' --bundle-output='android/rnsamplefixed/src/main/assets/index.android.bundle' --dev=false --platform='android'  --assets-dest='android/rnsamplefixed/src/main/res'",
    "android:fonts:clear": "rm -r android/rnsamplefixed/src/main/assets/fonts",
    "android:fonts:copy": "cp -a android/app/src/main/assets/fonts android/rnsamplefixed/src/main/assets/fonts",
    "android:fonts:update": "yarn android:fonts:clear && yarn android:fonts:copy",
    "android:generate:aar": "yarn android:fonts:update && cd android && ./gradlew :rnsamplefixed:assembleRelease",</b>
    "ios": "react-native run-ios",
    ...
  },
  ...
}
</pre>
[sampleTS/package.json](sampleTS/package.json)

---
### Using @naturacosmeticos/natds-icons

When using fonts with React Native, yout need a `react-native.config.js` file, where you manage dependencies using `react-native link`.
<pre>
<b>
module.exports = {
  assets: ['node_modules/@naturacosmeticos/natds-icons/dist/fonts'],
};
</b>
</pre>
[sampleTS/react-native.config.js](sampleTS/react-native.config.js)

