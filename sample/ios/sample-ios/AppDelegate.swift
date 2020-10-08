//
//  AppDelegate.swift
//  sample-ios
//
//  Created by Raoni Valadares on 08/10/20.
//

import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
//  var appType: AppBuilder.UIApplicationType = .singleViewController
//  var notebookParameters = AppBuilder.buildParameters()
//  var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {

//      self.window = UIWindow(frame: UIScreen.main.bounds)
//      self.window?.rootViewController = AppBuilder.build(self.appType)
//      self.window?.makeKeyAndVisible()
    }
}

