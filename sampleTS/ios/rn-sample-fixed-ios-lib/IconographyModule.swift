import UIKit
import class React.RCTBridge
import React

@objc public class IconographyModule: NSObject {
    public static var currentViewController: UIViewController?

    @objc public static func getViewController() -> UIViewController? {
        return currentViewController
    }

    // MARK: - Initialization

  public func start(fromViewController viewController: UIViewController) {
        guard let bridge = RCTBridge(delegate: self, launchOptions: nil) else {
            return
        }

    let reactView = self.buildReactView(bridge: bridge)
        viewController.view.addSubview(reactView)
        self.setupConstraints(reactView, for: viewController)

        IconographyModule.currentViewController = viewController
    }
}

extension IconographyModule: RCTBridgeDelegate {
    public func sourceURL(for bridge: RCTBridge!) -> URL! {
        #if DEBUG
            return RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
        #else
            let bundle = Bundle(for: IconographyModule.self)
            return bundle.url(forResource: "main", withExtension: "jsbundle")
        #endif
    }
}

protocol CodeReactView {
    func buildReactView(bridge: RCTBridge) -> RCTRootView
    func setupConstraints(_ reactView: RCTRootView, for viewController: UIViewController)
}

extension IconographyModule: CodeReactView {
    func buildReactView(bridge: RCTBridge) -> RCTRootView {
      return RCTRootView(bridge: bridge, moduleName: "sampleTS", initialProperties: nil)
    }

    func setupConstraints(_ reactView: RCTRootView, for viewController: UIViewController) {
        reactView.translatesAutoresizingMaskIntoConstraints = false

        reactView.topAnchor.constraint(equalTo: viewController.view.topAnchor).isActive = true
        reactView.bottomAnchor.constraint(equalTo: viewController.view.bottomAnchor).isActive = true
        reactView.trailingAnchor.constraint(equalTo: viewController.view.trailingAnchor).isActive = true
        reactView.leadingAnchor.constraint(equalTo: viewController.view.leadingAnchor).isActive = true
    }
}
