import type { WebieConfig } from '../utils/get-plugin-configs.server'

const config = (): WebieConfig => {
    return {
        pluginName: 'E-commerce',
        adminRoutes: [
            {
                label: 'Products',
                to: 'products',
                iconName: 'package',
            },
        ],
    }
}

export default config
